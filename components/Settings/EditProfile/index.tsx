import { useState, useEffect, useContext } from "react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import { AuthContext } from "@/context/auth-context";
import { FaUserAlt, FaUserCheck } from "react-icons/fa";
import { ImCancelCircle, ImLocation2, ImSpinner9 } from "react-icons/im";
import { FaLocationCrosshairs, FaPhoneVolume } from "react-icons/fa6";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

type EditProfileProps = {};
interface User {
  firstName: string;
  lastName: string;
  profileUrl: string;
  country: string;
  bio: string;
  _id?: string;
}
const EditProfile = ({}: EditProfileProps) => {
  const [profileUrl, setProfileUrl] = useState<any>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [isChangesSaved, setIsChangesSaved] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({ _id: "" });
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [percentage, setPercentage] = useState(0);
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (authContext.authState.user._id) {
      setUser(authContext.authState.user);
      setToken(authContext.authState.token);

      setFirstName(authContext.authState.user.firstName);
      setLastName(authContext.authState.user.lastName);
      setCountry(authContext.authState.user.country);
      setBio(authContext.authState.user.bio);
      setZipcode(authContext.authState.user.zipcode);
      setProfileUrl(authContext.authState.user.profileUrl);
      setPhoneNumber(authContext.authState.user.phoneNumber);
    }
  }, [authContext.authState]);

  const handleUpload1 = async (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileUrl(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated User Profile:", {
      firstName,
      lastName,
      profileUrl,
      country,
      bio,
    });
    return updateProfile(profileUrl);
  };

  const updateProfile = async (url: string) => {
    let result;

    let body = {
      firstName: firstName,
      lastName: lastName,
      profileUrl: url ? url : profileUrl,
      country: country,
      bio: bio,
      phoneNumber: phoneNumber,
      zipcode: zipcode,
    };
  };
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const selectedFile = e.target.files?.[0]; // Use optional chaining to handle null

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreview("");
    }
  };

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, `profile/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    let bucketName = "profile";
    // var storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    // let uploadTask = storageRef.put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            return updateProfile(downloadURL);
          })
          .catch((e) => {
            updateProfile(profileUrl);
          });
      }
    );
  };

  // const FirebaseUpload = () => {
  //   let storageRef = storage().ref();
  //   storageRef
  //     .child("/file/" + file.name)
  //     .getDownloadURL()
  //     .then((url: any) => {
  //       setPercentage(100);
  //       if (url) {
  //         setUrl(url);
  //         // createPost(url);

  //       } else {
  //         setLoading(true);
  //       }
  //     })
  //     .catch((err: any) => {
  //       setLoading(true);
  //       console.log(err.message);
  //     });
  // };

  return (
    <form
      className=""
      action=""
      onSubmit={(e) => {
        if (preview) upload(e);
        else handleSubmit(e);
      }}
    >
      <div className="mb-8 h4 md:mb-6">Edit profile</div>
      <div className="mb-3 base2 font-semibold text-n-6 dark:text-n-1">
        Avatar
      </div>
      <div className="flex items-center mb-6">
        <div className="relative flex justify-center items-center shrink-0 w-28 h-28 mr-4 rounded-full overflow-hidden bg-n-2 dark:bg-n-6">
          {profileUrl || preview ? (
            <Image
              className="object-cover rounded-full"
              src={preview ? preview : profileUrl}
              fill
              alt="Avatar"
            />
          ) : (
            <Icon className="w-8 h-8 dark:fill-n-1" name="profile" />
          )}
        </div>
        <div className="grow">
          <div className="relative inline-flex mb-4">
            <input
              className="peer absolute inset-0 opacity-0 cursor-pointer"
              type="file"
              onChange={handleUpload}
            />
            <button className="btn-stroke-light peer-hover:bg-n-3 dark:peer-hover:bg-n-5">
              Upload new image
            </button>
          </div>
          <div className="caption1 text-n-4">
            <p>At least 800x800 px recommended.</p>
            <p>JPG or PNG and GIF is allowed</p>
          </div>
        </div>
      </div>
      <Field
        className="mb-6"
        label="First Name"
        placeholder="firstname"
        customIcon={<FaUserAlt className="text-xl" />}
        value={firstName}
        onChange={(e: any) => setFirstName(e.target.value)}
        required
      />
      <Field
        className="mb-6"
        customIcon={<FaUserAlt className="text-xl" />}
        placeholder="lastname"
        label="Last Name"
        value={lastName}
        onChange={(e: any) => setLastName(e.target.value)}
      />
      <Field
        className="mb-6"
        label="Country"
        placeholder="country"
        customIcon={<ImLocation2 className="text-2xl" />}
        value={country}
        onChange={(e: any) => setCountry(e.target.value)}
      />
      <Field
        className="mb-6"
        label="Phone Number"
        placeholder="Phone Number"
        customIcon={<FaPhoneVolume className="text-xl" />}
        type="number"
        value={phoneNumber}
        onChange={(e: any) => setPhoneNumber(e.target.value)}
      />
      {/* <Field
        className="mb-6"
        label="Zipcode"
        placeholder="country"
        customIcon={<FaLocationCrosshairs className="text-xl" />}
        type="number"
        value={zipcode}
        onChange={(e: any) => setZipcode(e.target.value)}
      /> */}

      <Field
        className="mb-6"
        label="Bio"
        placeholder="Short bio"
        customIcon={<FaUserCheck className="text-2xl" />}
        value={bio}
        onChange={(e: any) => setBio(e.target.value)}
        textarea
      />
      {isChangesSaved && (
        <p className="text-green-500 text-center mt-2">
          Changes have been saved!
        </p>
      )}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      <button
        className="btn bg-primary-1 border-0 text-white w-full flex items-center"
        type="submit"
      >
        {loading && (
          <ImSpinner9
            className="animate-spin h-5 w-5 ml-2 text-n-1 fill-n-1"
            style={{ fill: "white" }}
          />
        )}
        Save changes
      </button>
    </form>
  );
};

export default EditProfile;
