import serverApi from "@/api/serverSide/api";
import Page from "@/components/Page/Page";
import FreeMeals from "./_components/FreeMeals/FreeMeals";
import CreateRecruitButton from "./_components/Recruits/CreateRecruitButton";
import RecruitList from "./_components/Recruits/RecruitList";
import Users from "./_components/Users/Users";

export const revalidate = 0;

interface HomePageProps {
  searchParams: { page: string };
}

async function HomePage({ searchParams: { page } }: HomePageProps) {
  const initialRecruitList = await serverApi.recruits.getGroupOfPageRecruits(
    0,
    5
  );
  return (
    <Page
      width="lg"
      isMain={false}
      className="h-full flex items-center justify-between py-20"
    >
      <div className="grid grid-cols-4 gap-x-5 w-full">
        <FreeMeals />
        <div className="col-span-2">
          <CreateRecruitButton />
          <RecruitList initialRecruitList={initialRecruitList!} />
        </div>
        <Users page={page} />
      </div>
    </Page>
  );
}

export default HomePage;