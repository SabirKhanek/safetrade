// import { apiClientServer } from "./api-client";
// import { TestClient } from "./testClient";

import { Categories } from "./home_sections/categories";
import Hero from "./home_sections/hero";
import { HowWeWork } from "./home_sections/how_we_work";
import { InterestBasedOffers } from "./home_sections/interestoffers";
import { IntroSection } from "./home_sections/intro";
import { NotLimited } from "./home_sections/not_limited";
import { TrendingOffers } from "./home_sections/trending_offers";

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
      <IntroSection />
      <HowWeWork />
      <NotLimited />
      <Categories />
      <InterestBasedOffers />
      <TrendingOffers />
    </div>
  );
}
