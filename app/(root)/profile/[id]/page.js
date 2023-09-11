import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Follow from "../../../../components/shared/Follow";
import { profileTabs } from "../../../../constants/index";
import ThreadsTab from "../../../../components/shared/ThreadsTab";
import ProfileHeader from "../../../../components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { fetchUser } from "../../../../lib/actions/user.actions";

async function Page({ params }) {
  let user = null;
  try {
    user = await currentUser();
  } catch (error) {
    console.error("Error fetching current user:", error);
  }

  if (!user) {
    return (
      <div>
        <p>You are not authenticated.</p>
      </div>
    );
  }

  let userInfo = null;
  try {
    userInfo = await fetchUser(params.id);
  } catch (error) {
    console.error("Error fetching user information:", error);
  }

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
    return null;
  }

  // Check if the user is viewing their own profile
  const isOwnProfile = user.id === userInfo.id;

  // Check if the user is already following the profile they are viewing
  const isFollowing = isOwnProfile
    ? false // If it's their own profile, don't show the Follow button
    : user.following ? user.following.indexOf(userInfo.id) !== -1 : false;

  return (
    <section>
      <ProfileHeader
        accountId={userInfo._id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      {!isOwnProfile && ( // Render Follow button only if it's not their own profile
        <Follow
          initialIsFollowing={isFollowing}
          accountId={userInfo._id}
          authUserId={user.id}
        />
      )}

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className='tab'>
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className='w-full text-light-1'
            >
              {/* @ts-ignore */}
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType='User'
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
