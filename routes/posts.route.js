const express = require("express");
const fs = require("fs").promises;

const DB_PATH = "./db.json";
const RESOURCE = "posts";

// Write DB
const writeDb = async (resource, data) => {
    let db = {};
    try {
        const jsonDb = await fs.readFile(DB_PATH, "utf-8");
        db = JSON.parse(jsonDb);
    } catch (error) {}

    db[resource] = data;

    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
};

// Read DB
const readDb = async (resource) => {
    try {
        const jsonDb = await fs.readFile(DB_PATH, "utf-8");
        const db = JSON.parse(jsonDb) ?? {};
        return db[resource] ?? [];
    } catch (error) {
        return [];
    }
};

const router = express.Router();

// 1. Xóa bỏ mảng "posts" (Fake DB)
// 2. Thay thế "posts" tại các method bằng readDb(RESOURCE)
// 3. Tại methods thêm/sửa/xóa dùng writeDb(RESOURCE)

router.get("/", async (req, res) => {
    const posts = await readDb(RESOURCE);
    res.json({
        status: "success",
        data: posts,
    });
});

router.get("/:id", async (req, res) => {
    const posts = await readDb(RESOURCE);
    const post = posts.find((post) => post.id === +req.params.id);

    if (!post) {
        res.status(404).json({
            status: "error",
            message: "Resource notfound.",
        });
        return;
    }

    res.json({
        status: "success",
        data: post,
    });
});

router.post("/", async (req, res) => {
    const posts = await readDb(RESOURCE);
    const nextId = (posts.at(-1)?.id ?? 0) + 1;
    const post = {
        ...req.body,
        id: nextId,
    };

    posts.push(post);

    await writeDb(RESOURCE, posts);

    res.status(201).json({
        status: "success",
        data: post,
    });
});

router.put("/:id", async (req, res) => {
    const posts = await readDb(RESOURCE);
    const post = posts.find((post) => post.id === +req.params.id);

    if (!post) {
        res.status(404).json({
            status: "error",
            message: "Resource notfound.",
        });
        return;
    }

    Object.assign(post, req.body);

    await writeDb(RESOURCE, posts);

    res.json({
        status: "success",
        data: post,
    });
});

router.delete("/:id", async (req, res) => {
    const posts = await readDb(RESOURCE);
    const postIndex = posts.findIndex((post) => post.id === +req.params.id);

    if (postIndex === -1) {
        res.status(404).json({
            status: "error",
            message: "Resource notfound.",
        });
        return;
    }

    posts.splice(postIndex, 1);

    await writeDb(RESOURCE, posts);

    res.status(204).send();
});

module.exports = router;
