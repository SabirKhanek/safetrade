// import { apiClientServer } from "./api-client";
// import { TestClient } from "./testClient";

import Hero from "./components/home_sections/hero";

export default async function Home() {
  // try {
  //   const { body } = await apiClientServer.user.getAll({
  //     fetchOptions: { next: { tags: ["users"], revalidate: 1 } },
  //   });

  //   return (
  //     <>
  //       <span>Rendered from server</span>
  //       <ul>
  //         {body.map((u) => (
  //           <div className="text-red-500">{u.username}</div>
  //         ))}
  //       </ul>
  //       <span>Rendered by client</span>
  //       <TestClient></TestClient>
  //     </>
  //   );
  // } catch (err) {
  //   return <pre>{JSON.stringify(err, undefined, 3)}</pre>;
  // }
  return (
    <div>
      <Hero></Hero>
    </div>
  );
}
