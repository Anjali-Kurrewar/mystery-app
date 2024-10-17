import UserModel from '@/model/User';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbconnect';
import { User } from 'next-auth';
import { NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
  await dbConnect();
  
  // Get session
  const session = await getServerSession(authOptions);

  // Explicitly check if session is null or user is undefined
  if (!session || !session.user) {
    return new Response(
      JSON.stringify({ success: false, message: 'Not authenticated' }),
      { status: 401 }
    );
  }

  const _user = session.user as User; // Assert that session.user is of type User

  try {
    const updateResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Message not found or already deleted', success: false }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Message deleted', success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return new Response(
      JSON.stringify({ message: 'Error deleting message', success: false }),
      { status: 500 }
    );
  }
}
