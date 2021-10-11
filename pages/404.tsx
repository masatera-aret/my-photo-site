import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  function edirect() {
    setTimeout(() => {
      router.push(`/`);
    }, 3000);
  }
  edirect();

  return (
    <div>
      <h1>存在しないページです</h1>
      <p>Homeへ移動します</p>
    </div>
  );
};

export default NotFound;
