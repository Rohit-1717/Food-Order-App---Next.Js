import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createMenuHandler } from "./handlers/menu/create";
import { listMenuHandler } from "./handlers/menu/list";
import { updateMenuHandler } from "@/app/api/rpc/handlers/menu/update";
import { deleteMenuHandler } from "@/app/api/rpc/handlers/menu/delete";

const rpcRequestSchema = z.object({
  jsonrpc: z.literal("2.0"),
  method: z.string(),
  params: z.any().optional(),
  id: z.union([z.string(), z.number()]),
});

const rpcSuccess = (id: string | number, result: any) => ({
  jsonrpc: "2.0",
  result,
  id,
});

const rpcError = (
  id: string | number | null,
  code: number,
  message: string
) => ({
  jsonrpc: "2.0",
  error: {
    code,
    message,
  },
  id,
});

const rpcMethods: Record<string, (params: any) => Promise<any>> = {
  "menu.create": async (params) => await createMenuHandler(params),
  "menu.list": listMenuHandler,
  "menu.update": updateMenuHandler,
  "menu.delete": deleteMenuHandler,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = rpcRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(rpcError(null, -32600, "Invalid Request"), {
        status: 400,
      });
    }

    const { method, params, id } = parsed.data;
    const handler = rpcMethods[method];

    if (!handler) {
      return NextResponse.json(rpcError(id, -32601, "Method not found"), {
        status: 404,
      });
    }

    const result = await handler(params);
    return NextResponse.json(rpcSuccess(id, result));
  } catch (err: any) {
    console.error("RPC Server Error:", err);
    return NextResponse.json(
      rpcError(null, -32603, err?.message || "Internal server error"),
      { status: 500 }
    );
  }
}
