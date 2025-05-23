require("module-alias/register");
const db = require("@/configs/db");
const { faker } = require("@faker-js/faker");
const slugify = require("slugify");

async function run() {
  try {
    console.log("Starting posts seeder...");

    // Get all user IDs to randomly assign posts to users
    const [usersResult] = await db.query("SELECT id FROM users");
    if (!usersResult.length) {
      console.error("No users found in database. Please seed users first.");
      return;
    }
    const userIds = usersResult.map((user) => user.id);

    // Prepare bulk insert
    const records = 200;
    let values = [];
    let placeholders = [];

    for (let i = 0; i < records; i++) {
      // Generate a title
      const title = faker.lorem
        .sentence(Math.floor(Math.random() * 5) + 3)
        .replace(/\.$/, "");

      // Create a unique slug
      const baseSlug = slugify(title, {
        lower: true,
        strict: true,
      });
      const slug = `${baseSlug}-${faker.string.alphanumeric(6)}`;

      // Generate random user ID
      const randomUserIndex = Math.floor(Math.random() * userIds.length);
      const userId = userIds[randomUserIndex];

      // Generate random content and description
      const description =
        Math.random() > 0.2
          ? faker.lorem.paragraph(Math.floor(Math.random() * 3) + 1)
          : null;
      const content = faker.lorem.paragraphs(
        Math.floor(Math.random() * 8) + 3,
        "<br/>\n"
      );

      // Random published date (80% are published)
      const publisedAt =
        Math.random() > 0.2
          ? faker.date.between({
              from: "2023-01-01T00:00:00.000Z",
              to: "2025-05-13T00:00:00.000Z",
            })
          : null;

      // Set created and updated dates
      const createAt = faker.date.between({
        from: "2022-01-01T00:00:00.000Z",
        to: "2025-05-13T00:00:00.000Z",
      });

      // Updated date is either same as created or later
      const updateAt =
        Math.random() > 0.7
          ? faker.date.between({
              from: createAt,
              to: "2025-05-13T00:00:00.000Z",
            })
          : createAt;

      // Add to values array
      values.push(
        title,
        slug,
        description,
        content,
        publisedAt ? formatDate(publisedAt) : null,
        formatDate(createAt),
        formatDate(updateAt),
        userId
      );

      // Add placeholder for prepared statement
      placeholders.push("(?, ?, ?, ?, ?, ?, ?, ?)");
    }

    // Execute bulk insert
    const query = `
      INSERT INTO posts (
        title, slug, description, content, 
        publised_at, create_at, update_at, user_id
      ) 
      VALUES ${placeholders.join(", ")}
    `;

    const result = await db.query(query, values);
    console.log(`Successfully seeded ${result.affectedRows} posts`);
  } catch (error) {
    console.error("Error seeding posts:", error);
  } finally {
    // Close database connection if needed
    process.exit(0);
  }
}

// Helper function to format date for MySQL
function formatDate(date) {
  return date ? date.toISOString().slice(0, 19).replace("T", " ") : null;
}

run();
