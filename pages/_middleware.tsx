import { NextRequest, NextResponse } from "next/server";

const cookie = require("js-cookie");
//const jwt = require("jsonwebtoken");
//import jwt from "jsonwebtoken";
export function middleware(req: NextRequest) {
  const { cookies } = req;
  const token = cookies.token;
  const { pathname, origin } = req.nextUrl;
  const url = req.nextUrl.clone();

  if (url.pathname === "/add-book") {
    if (token === undefined) {
      return NextResponse.rewrite(`${origin}/signin`);
    }
    try {
      //  jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      NextResponse.rewrite(`${origin}/signin`);
    }
    return NextResponse.next();
  }
  if (url.pathname === "/my-profile") {
    if (token === undefined) {
      return NextResponse.rewrite(`${origin}/signin`);
    }
    try {
      //  jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      NextResponse.rewrite(`${origin}/signin`);
    }
    return NextResponse.next();
  }
  if (url.pathname === "/signin") {
    if (token !== undefined) {
      return NextResponse.rewrite(`${origin}/`);
    }
    return NextResponse.next();
  }
  if (url.pathname === "/signup") {
    if (token !== undefined) {
      return NextResponse.rewrite(`${origin}/`);
    }
    return NextResponse.next();
  }
}
