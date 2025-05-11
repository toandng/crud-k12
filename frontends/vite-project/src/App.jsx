import { Routes, Route } from "react-router-dom";

import Home from "./page/Home";
import NewPost from "./page/NewPost";
import EditPost from "./page/EditPost";
import Post from "./page/Post";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />

            <Route path="/new-post" element={<NewPost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
        </Routes>
    );
}
