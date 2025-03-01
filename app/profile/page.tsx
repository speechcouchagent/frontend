"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    talkType: "",
    talkStyle: "",
    brandPositioning: "",
    bookTitle: "",
    bookSubtitle: "",
    authorName: "",
    bookDescription: "",
    bookTOC: "",
    targetAudience: "",
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      router.push("/(public)/auth");
      return;
    }

    fetch("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data.profile || {}))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(profile),
    });

    const data = await res.json();
    alert(data.msg);
  };

  const goToAgent = () => {
    router.push("/(private)/agent");
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile Setup</h1>
      <input
        className="border p-2 w-full my-2"
        type="text"
        placeholder="Talk Type"
        value={profile.talkType}
        onChange={(e) => setProfile({ ...profile, talkType: e.target.value })}
      />
      <input
        className="border p-2 w-full my-2"
        type="text"
        placeholder="Talk Style"
        value={profile.talkStyle}
        onChange={(e) => setProfile({ ...profile, talkStyle: e.target.value })}
      />
      <input
        className="border p-2 w-full my-2"
        type="text"
        placeholder="Brand Positioning"
        value={profile.brandPositioning}
        onChange={(e) => setProfile({ ...profile, brandPositioning: e.target.value })}
      />
      <input
        className="border p-2 w-full my-2"
        type="text"
        placeholder="Book Title"
        value={profile.bookTitle}
        onChange={(e) => setProfile({ ...profile, bookTitle: e.target.value })}
      />
      <input
        className="border p-2 w-full my-2"
        type="text"
        placeholder="Book Subtitle"
        value={profile.bookSubtitle}
        onChange={(e) => setProfile({ ...profile, bookSubtitle: e.target.value })}
      />
      <input
        className="border p-2 w-full my-2"
        type="text"
        placeholder="Author Name"
        value={profile.authorName}
        onChange={(e) => setProfile({ ...profile, authorName: e.target.value })}
      />
      <textarea
        className="border p-2 w-full my-2"
        placeholder="Book Description"
        value={profile.bookDescription}
        onChange={(e) => setProfile({ ...profile, bookDescription: e.target.value })}
      />
      <textarea
        className="border p-2 w-full my-2"
        placeholder="Book TOC"
        value={profile.bookTOC}
        onChange={(e) => setProfile({ ...profile, bookTOC: e.target.value })}
      />
      <textarea
        className="border p-2 w-full my-2"
        placeholder="Target Audience"
        value={profile.targetAudience}
        onChange={(e) => setProfile({ ...profile, targetAudience: e.target.value })}
      />
      <button className="bg-green-500 text-white p-2 w-full mb-4" onClick={handleSave}>
        Save Profile
      </button>
      <button className="bg-blue-500 text-white p-2 w-full" onClick={goToAgent}>
        Go to Voice Agent
      </button>
    </div>
  );
}
