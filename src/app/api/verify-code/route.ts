import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";

export async function POST(request: Request){
    await dbConnect()
    try {
        
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            { status : 500}
        )
    }
}