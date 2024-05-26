import { createClient } from '@bitspace/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const supabase = createClient();

    const redirectTo = request.nextUrl.clone();
    redirectTo.pathname = '/';

    await supabase.auth.signOut();

    return NextResponse.redirect(redirectTo);
}
