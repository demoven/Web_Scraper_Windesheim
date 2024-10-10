import RobotsChecker from "../Scraper/RobotsChecker";


test('compare robots.txt with local file', async () => {
  const robotsChecker = new RobotsChecker('https://www.mckinsey.com/robots.txt', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36');
  const isAllowed = await robotsChecker.isAllowed('https://www.mckinsey.com/layouts/');
  expect(isAllowed).toBe(false);

  const isAllowed2 = await robotsChecker.isAllowed('https://www.mckinsey.com/about-us/case-studies');
  expect(isAllowed2).toBe(true);

  const robot = robotsChecker.robots;
  console.log("Le robot txt : " + robot);
  expect(robot).toBeDefined();
  expect(robot).not.toBeNull();
});