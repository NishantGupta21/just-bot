import connectMongo from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    console.log("Hello world");
    await connectMongo();

    // Parse the request body
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a new user object
    const user = new User({
      userId,
    });

    // Save the user to MongoDB
    await user.save();

    // Send a success response
    return new Response(
      JSON.stringify({ message: "User data saved successfully!" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error saving user data",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ message: "Use POST to save user data." }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
