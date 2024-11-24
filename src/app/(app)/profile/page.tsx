import Image from "next/image";
import DP from "/public/chill.webp";

const ProfilePage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">My Profile</h1>

      <div className="rounded-lg border p-5 space-y-3">
        <Image alt="Me" src={DP} className="w-20 h-20 rounded-lg" />
        <div className="space-y-1">
          <h2 className="text-xl">Chill Guy</h2>
          <p className="text-gray-500">Bachelor of Science in Chilling</p>
        </div>

        <div className="border rounded-full px-5 py-2 w-fit text-gray-500">
          Enrolled
        </div>
      </div>

      <div className="rounded-lg border p-5 space-y-3">
        <div className="space-y-1">
          <div className="text-gray-500">Classification</div>
          College
        </div>

        <div className="space-y-1">
          <div className="text-gray-500">ID Number</div>
          12-345-6789
        </div>

        <div className="space-y-1">
          <div className="text-gray-500">Medical Clearance</div>
          Cleared
        </div>

        <div className="space-y-1">
          <div className="text-gray-500">CIIT Email</div>
          chill.guy@ciit.edu.ph
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
