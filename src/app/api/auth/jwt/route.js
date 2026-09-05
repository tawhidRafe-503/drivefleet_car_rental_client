import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const reqHeaders = await headers();
    let session = await auth.api.getSession({
      headers: reqHeaders,
    }).catch(() => null);

    if ((!session || !session.user) && request?.headers) {
      session = await auth.api.getSession({
        headers: request.headers,
      }).catch(() => null);
    }

    if (!session || !session.user) {
      return Response.json(
        { success: false, message: "Unauthorized: No active session" },
        { status: 401 }
      );
    }

    const secret = process.env.BETTER_AUTH_SECRET || "DcvNtqJKuJsdNrHc1iTPva9xVyOlX6Ur";

    const token = jwt.sign(
      {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      },
      secret,
      { expiresIn: "7d" }
    );

    return Response.json({
      success: true,
      token,
      jwt: token,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message || "Failed to issue JWT token" },
      { status: 500 }
    );
  }
}
