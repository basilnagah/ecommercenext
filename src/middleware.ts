import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {

    const token = await getToken({ req: request })
    const { pathname } = request.nextUrl


    // if (!token && pathname == '/cart' || pathname == '/allorders') {
    //     return NextResponse.redirect( new URL('/login' , request.url) )
    // }
    
    
    if(token && pathname=='/login' || pathname=='/register'){
        
        return NextResponse.redirect( new URL('/' , request.url) )
    }


}




export const config = {
    matcher: ['/cart', '/allorders' , '/login' , '/register']
}