export const getServerSideProps = async (context) => ({
  props: {
    layout: "Plain", // 複数のレイアウトを切り替えたいときは 'MainLayout' などの文字列を用いる
  },
});
const login = (props) => {
  return (
    <div className={`t-main-height flex justify-center items-center`}>
      <form
        className={`w-1/3 flex flex-col items-center mx-auto py-12 px-7 border border-gray-400`}
      >
        <h1 className={`t-under-border text-green-600`}>login</h1>
        <div className={`mt-5`}>
          <label htmlFor={"email"}>email</label>
          <input type="email" id={`email`} />
        </div>
        <div className={`mt-5`}>
          <label htmlFor={"password"}>password</label>
          <input type="password" id={`password`} />
        </div>
      </form>
    </div>
  );
};

export default login;
