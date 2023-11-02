import { NextResponse } from 'next/server';
import { connect } from '@/connectDB';
import User from '@/models/userModel';
import { sendVerificationEmail } from '@/helpers/verificationEmail';
import { StatusCodes } from 'http-status-codes';

export const POST = async (request) => {
  try {
    await connect();
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        {
          msg: `No user exists with email : ${email}`,
        },
        { status: StatusCodes.BAD_REQUEST }
      );

    await sendVerificationEmail({
      email,
      emailType: 'RESET_PASSWORD',
      userId: user._id,
    });

    return NextResponse.json(
      { msg: 'Reset password link sent successfully' },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
    });
  }
};
