import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { JwtPayload, verifyJwtToken } from "@/lib/jwt";

// Menu Handlers
import { createMenuHandler } from "./handlers/menu/create";
import { listMenuHandler } from "./handlers/menu/list";
import { updateMenuHandler } from "./handlers/menu/update";
import { deleteMenuHandler } from "./handlers/menu/delete";
import { signupKitchenAdmin } from "./handlers/auth/signupKitchen";
import { signupUser } from "./handlers/auth/signupUser";
import { loginKitchenAdmin } from "./handlers/auth/loginKitchenAdmin";
import { loginUser } from "./handlers/auth/loginUser";
import { logoutHandler } from "./handlers/auth/logout";

// Auth Context Type
interface AuthContext {
  user?: {
    id: string;
    email?: string;
    type: "user" | "kitchen";
    [key: string]: any;
  };
  isAuthenticated: boolean;
}

// Enhanced handler type with auth context
type AuthenticatedHandler = (params: any, context: AuthContext) => Promise<any>;

// JSON-RPC Schema
const rpcRequestSchema = z.object({
  jsonrpc: z.literal("2.0"),
  method: z.string(),
  params: z.any().optional(),
  id: z.union([z.string(), z.number()]).optional(),
});

// JSON-RPC Response Helpers
const rpcSuccess = (id: string | number | null, result: any) => ({
  jsonrpc: "2.0" as const,
  result,
  id,
});

const rpcError = (
  id: string | number | null,
  code: number,
  message: string,
  data?: any
) => ({
  jsonrpc: "2.0" as const,
  error: {
    code,
    message,
    ...(data && { data }),
  },
  id,
});

// JSON-RPC Error Codes
const RPC_ERRORS = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
  UNAUTHORIZED: -32001,
  FORBIDDEN: -32002,
  VALIDATION_ERROR: -32003,
} as const;

// Token verifier
async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    return verifyJwtToken(token);
  } catch {
    return null;
  }
}

// Build authentication context
async function createAuthContext(req: NextRequest): Promise<AuthContext> {
  const userToken = req.cookies.get("user-token")?.value;
  const kitchenToken = req.cookies.get("kitchen-token")?.value;

  if (userToken) {
    const userPayload = await verifyToken(userToken);
    if (userPayload) {
      return {
        user: {
          ...userPayload,
          id: userPayload.userId ?? userPayload.id,
          type: "user",
        },
        isAuthenticated: true,
      };
    }
  }

  if (kitchenToken) {
    const kitchenPayload = await verifyToken(kitchenToken);
    if (kitchenPayload) {
      return {
        user: {
          ...kitchenPayload,
          id: kitchenPayload.kitchenId ?? kitchenPayload.id,
          type: "kitchen",
        },
        isAuthenticated: true,
      };
    }
  }

  return { isAuthenticated: false };
}

// Require authentication wrapper
const requireAuth = (
  handler: AuthenticatedHandler,
  requiredType?: "user" | "kitchen"
) => {
  return async (params: any, context: AuthContext) => {
    if (!context.isAuthenticated || !context.user) {
      throw new Error("Authentication required");
    }
    if (requiredType && context.user.type !== requiredType) {
      throw new Error(`Access denied. ${requiredType} access required`);
    }
    return handler(params, context);
  };
};

// Public method wrapper
const publicMethod = (handler: (params: any) => Promise<any>) => {
  return async (params: any) => {
    return handler(params);
  };
};

// JSON-RPC Methods Registry
const rpcMethods: Record<string, AuthenticatedHandler> = {
  "auth.signupUser": publicMethod(signupUser),
  "auth.signupKitchenAdmin": publicMethod(signupKitchenAdmin),
  "auth.loginKitchenAdmin": publicMethod(loginKitchenAdmin),
  "auth.loginUser": publicMethod(loginUser),
  "auth.logout": publicMethod(logoutHandler),

  "menu.list": publicMethod(listMenuHandler),
  "menu.create":(createMenuHandler),
  "menu.update":(updateMenuHandler),
  "menu.delete":(deleteMenuHandler),
};

// POST handler
export async function POST(req: NextRequest) {
  let requestId: string | number | null = null;

  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        rpcError(null, RPC_ERRORS.PARSE_ERROR, "Parse error"),
        { status: 400 }
      );
    }

    const parsed = rpcRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        rpcError(
          body?.id || null,
          RPC_ERRORS.INVALID_REQUEST,
          "Invalid Request",
          parsed.error.issues
        ),
        { status: 400 }
      );
    }

    const { method, params, id } = parsed.data;
    requestId = id || null;

    const handler = rpcMethods[method];
    if (!handler) {
      return NextResponse.json(
        rpcError(
          requestId,
          RPC_ERRORS.METHOD_NOT_FOUND,
          `Method '${method}' not found`
        ),
        { status: 404 }
      );
    }

    const authContext = await createAuthContext(req);

    try {
      const result = await handler(params || {}, authContext);
      return NextResponse.json(rpcSuccess(requestId, result));
    } catch (handlerError: any) {
      console.error(`Handler error for method '${method}':`, handlerError);

      if (handlerError?.message === "Authentication required") {
        return NextResponse.json(
          rpcError(requestId, RPC_ERRORS.UNAUTHORIZED, handlerError.message),
          { status: 401 }
        );
      }

      if (handlerError?.message?.includes("Access denied")) {
        return NextResponse.json(
          rpcError(requestId, RPC_ERRORS.FORBIDDEN, handlerError.message),
          { status: 403 }
        );
      }

      if (handlerError?.name === "ZodError") {
        return NextResponse.json(
          rpcError(
            requestId,
            RPC_ERRORS.VALIDATION_ERROR,
            "Validation error",
            handlerError.issues
          ),
          { status: 400 }
        );
      }

      return NextResponse.json(
        rpcError(
          requestId,
          RPC_ERRORS.INTERNAL_ERROR,
          handlerError?.message || "Method execution failed"
        ),
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("RPC Server Error:", error);
    return NextResponse.json(
      rpcError(
        requestId,
        RPC_ERRORS.INTERNAL_ERROR,
        error?.message || "Internal server error"
      ),
      { status: 500 }
    );
  }
}

// Other HTTP verbs
export async function GET() {
  return NextResponse.json({
    message: "JSON-RPC 2.0 Server",
    version: "1.0.0",
    methods: Object.keys(rpcMethods),
    endpoint: "POST only",
  });
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST for JSON-RPC calls." },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST for JSON-RPC calls." },
    { status: 405 }
  );
}
