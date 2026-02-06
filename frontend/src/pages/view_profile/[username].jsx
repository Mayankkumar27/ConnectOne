// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router'; 
// import { BASE_URL, clientServer } from '@/config';
// import DashboardLayout from '@/layout/DashboardLayout';
// import UserLayout from '@/layout/UserLayout';
// import styles from './index.module.css'
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllPosts } from '@/config/redux/action/postAction';
// import { getConnectionsRequest, getMyConnectionRequests, sendConnectionRequest } from '@/config/redux/action/authAction';

// export default function ViewProfilePage({ userProfile }) {
//   const router = useRouter(); 
  
//   const { username } = router.query; 

//   const postReducer = useSelector((state) => state.postReducer); 

//   const dispatch = useDispatch();

//   const authState = useSelector((state) => state.auth)

//   const [userPosts, setUserPosts] = useState([]);

//   const [isCurrentUserInConnection, setIsCurrentInConnection] = useState(false);

//   const [isConnectionNull, setIsConnectionNull] = useState(true)



//   console.log("CONNECTIONS DATA:", JSON.stringify(authState.connections, null, 2));

//   const getUsersPost = async () => {
//     await dispatch(getAllPosts());
//     await dispatch(getConnectionsRequest({token:localStorage.getItem("token")}));

//     await dispatch(getMyConnectionRequests({token:localStorage.getItem("token")}));

//   }


//     useEffect(() => {
//         let post = postReducer.posts.filter((post)=> {
//             return post.userId.username === router.query.username
//         })
//         setUserPosts(post);

//     },[postReducer.posts])


//     useEffect(()=>{
//         // FIX: First, check if authState.connections is a valid array
//         if (authState.connections && Array.isArray(authState.connections)) {
//             console.log(authState.connections,userProfile.userId.id)


//             if(authState.connections.some(user=> user.connectionId._id === userProfile.userId._id)){
//                 setIsCurrentInConnection(true)
//                 if(authState.connections.find(user => user.connectionId._id === userProfile.userId._id).status_accepted === true){
//                     setIsConnectionNull(false)
//                 }
//             }
//             if(authState.connectionRequest.some(user=> user.userId._id === userProfile.userId._id)){
//                 setIsCurrentInConnection(true)
//                 if(authState.connectionRequest.find(user => user.userId._id === userProfile.userId._id).status_accepted === true){
//                     setIsConnectionNull(false)
//                 }
//             }
//         }
//     },[authState.connections, authState.connectionRequest])



//   useEffect(() => {

//     getUsersPost();
//   },[])

//   if (!username) {
//     return <div>Loading profile...</div>;
//   }

//   return (
//     <div>
//       <UserLayout>
//           <DashboardLayout>
//               <div className={styles.container}>
//                 <div className={styles.backDropContainer}>
//                     <img className={styles.backDrop} src={`${BASE_URL}/${userProfile.userId.profilePicture}`} alt="backdrop" />
//                 </div>

//                 <div className={styles.profileContainer_details}>
//                     <div className={styles.profileContainer_flex}>
//                         <div style={{flex: "0.8"}}>
//                             <div style={{display:"flex", width:"fit-content", alignItems:"center",gap:"1.2rem"}}>
//                                 <h2>{userProfile.userId.name}</h2>
//                                 <p style={{ color:"grey" }}>@{userProfile.userId.username}</p>


//                             </div>

//                             <div style={{ display:"flex", alignItems:"center", gap:"1.2rem" }}>
//                                 {isCurrentUserInConnection ? <button className={styles.connectedButton}> {isConnectionNull ? "Pending" : "Connected"}
//                                     </button>
//                                     :
//                                     <button onClick={async()=> {
//                                         console.log("Sending connection to ID:", userProfile.userId._id);
//                                         //nivhe
//                                         console.log("Token being sent:", localStorage.getItem("token")); 
//                                         await dispatch(sendConnectionRequest({ token: localStorage.getItem("token"),user_id: userProfile.userId._id }))
//                                         await dispatch(getConnectionsRequest({token:localStorage.getItem("token")}));
//                                         await dispatch(getMyConnectionRequests({token:localStorage.getItem("token")}));
//                                     }} className={styles.connectBtn}>Connect</button>}
//                             </div>

//                             <div className={styles.downloadButton} onClick={async()=> {
//                                 const response = await clientServer.get(`/user/download_resume?id=${userProfile.userId._id}`);
//                                 window.open(`${BASE_URL}/${response.data.message}`, "_blank")
//                             }}>
//                             <svg style={{width:"1.2em"}}xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
//                             </svg>

//                             </div>

//                                 <div className={styles.sectionContent}>
//                                     <p>{userProfile.bio}</p>
//                                 </div>


//                         </div>

//                         <div style={{flex:"0.2rem"}}>
//                             <h3>Recent Activity</h3>
//                             {userPosts.map((post) => {
//                                 return(
//                                     <div key={post._id} className={styles.postCard}>
//                                         <div className={styles.card}>
//                                             <div className={styles.card_profileContainer}>
//                                                 {post.media !=="" ? <img src={`${BASE_URL}/${post.media}`}  alt="" />
//                                                 :
//                                                  <div style={{width:"3.4rem", height:"3.4rem"}} ></div>}
//                                             </div>

//                                             <p>{post.body}</p>
//                                         </div>
//                                     </div>

//                                 )
//                             })}

//                         </div>
                        
//                     </div>
//                 </div>


//                 <div className="workHistory">
//                     <h4>Work History</h4>

//                     <div className={styles.workHistoryContainer}>
//                     {
//                         userProfile.pastWork.map((work,index) => {
//                             return(
//                                 <div key={index} className={styles.workHistoryCard}>
//                                     <p style={{ fontWeight:"bold",display:"flex",alignItems:"center",gap:"0.8rem"}}>{work.company}-{work.position}</p>
//                                     <p>{work.years}</p>
//                                 </div>
//                             )
//                         })
//                     }</div>
//                 </div>
                  
//               </div>
//           </DashboardLayout>
//       </UserLayout>
//     </div>
//   );
// }

// export async function getServerSideProps(context) {

//     console.log("From View")
//     console.log(context.query.username)

//     const request = await clientServer.get("/user/get_profile_based_on_username",{
//         params:{
//             username:context.query.username
//         }

//     })
    
//     const response = await request.data;
//     console.log(response)

//     return { props: {userProfile: request.data.profile} }
    
// }



import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BASE_URL, clientServer } from '@/config';
import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getConnectionsRequest, getMyConnectionRequests, sendConnectionRequest } from '@/config/redux/action/authAction';

export default function ViewProfilePage({ userProfile }) {
    const router = useRouter();
    const { username } = router.query;

    const postReducer = useSelector((state) => state.postReducer);
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [userPosts, setUserPosts] = useState([]);
    const [isCurrentUserInConnection, setIsCurrentInConnection] = useState(false);
    const [isConnectionNull, setIsConnectionNull] = useState(true);

    const getUsersPost = async () => {
        await dispatch(getAllPosts());
        await dispatch(getConnectionsRequest({ token: localStorage.getItem("token") }));
        await dispatch(getMyConnectionRequests({ token: localStorage.getItem("token") }));
    }

    useEffect(() => {
        if (postReducer.posts) {
            let post = postReducer.posts.filter((post) => {
                return post.userId.username === router.query.username
            })
            setUserPosts(post);
        }
    }, [postReducer.posts, router.query.username]);

    useEffect(() => {
        
        if (userProfile && authState.connections && Array.isArray(authState.connections)) {
            if (authState.connections.some(user => user.connectionId._id === userProfile.userId._id)) {
                setIsCurrentInConnection(true)
                if (authState.connections.find(user => user.connectionId._id === userProfile.userId._id).status_accepted === true) {
                    setIsConnectionNull(false)
                }
            }
            if (authState.connectionRequest.some(user => user.userId._id === userProfile.userId._id)) {
                setIsCurrentInConnection(true)
                if (authState.connectionRequest.find(user => user.userId._id === userProfile.userId._id).status_accepted === true) {
                    setIsConnectionNull(false)
                }
            }
        }
    }, [authState.connections, authState.connectionRequest, userProfile]);

    useEffect(() => {
        getUsersPost();
    }, [])

    return (
        <UserLayout>
            <DashboardLayout>
                {userProfile && userProfile.userId ? (
                    <div className={styles.container}>
                        <div className={styles.profileHeader}>
                            <img className={styles.backdrop} src={'https://cdn.shopify.com/s/files/1/0066/4574/3686/files/Blue_Architecture_Pattern_LinkedIn_Background_Photo.png?v=1627912075'} alt="Profile backdrop" />
                            <img className={styles.profileAvatar} src={`${BASE_URL}/${userProfile.userId.profilePicture}`} alt={`${userProfile.userId.name}'s avatar`} />
                        </div>

                        
                        <div className={styles.profileContent}>

                            
                            <main className={styles.mainContent}>
                                
                                <section className={styles.profileInfo}>
                                    <div className={styles.nameHeader}>
                                        <h2>{userProfile.userId.name}</h2>
                                        <p>@{userProfile.userId.username}</p>
                                    </div>
                                    <p className={styles.bioContent}>{userProfile.bio}</p>

                                    <div className={styles.profileActions}>
                                        {isCurrentUserInConnection ? (
                                            <button className={styles.secondaryBtn} disabled>
                                                {isConnectionNull ? "Pending" : "Connected"}
                                            </button>
                                        ) : (
                                            <button onClick={async () => {
                                                setIsCurrentInConnection(true); 
                                                setIsConnectionNull(true);

                                                await dispatch(sendConnectionRequest({ token: localStorage.getItem("token"), user_id: userProfile.userId._id }))
                                                getUsersPost();
                                            }} className={styles.primaryBtn}>
                                                Connect
                                            </button>
                                        )}
                                        <button className={styles.iconBtn} title="Download Resume" onClick={async () => {
                                            const response = await clientServer.get(`/user/download_resume?id=${userProfile.userId._id}`);
                                            window.open(`${BASE_URL}/${response.data.message}`, "_blank");
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                        </button>
                                    </div>
                                </section>

                                {/* Work History Card */}
                                {userProfile.pastWork && userProfile.pastWork.length > 0 && (
                                    <section className={styles.section}>
                                        <h4>Work History</h4>
                                        <div className={styles.cardGrid}>
                                            {userProfile.pastWork.map((work, index) => (
                                                <div key={index} className={styles.workHistoryCard}>
                                                    <p>{work.company}-{work.position}</p>
                                                    <p>{work.years}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {userProfile.education && userProfile.education.length > 0 && (
                                    <section className={styles.section}>
                                        <h4>Education</h4>
                                        <div className={styles.cardGrid}>
                                            {userProfile.education.map((edu, index) => (
                                                <div key={index} className={styles.workHistoryCard}>
                                                    <p>{edu.school}</p>
                                                    <p>{edu.degree}, {edu.fieldOfStudy}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </main>

                            <aside className={styles.sidebar}>
                                {userPosts && userPosts.length > 0 && (
                                    <section className={styles.section}>
                                        <h3>Recent Activity</h3>
                                        {userPosts.map((post) => (
                                            <div key={post._id} className={styles.postCard}>
                                                {post.media && <img src={`${BASE_URL}/${post.media}`} alt="" />}
                                                <p>{post.body}</p>
                                            </div>
                                        ))}
                                    </section>
                                )}
                            </aside>
                        </div>
                    </div>
                ) : (
                    <div>Loading profile...</div>
                )}
            </DashboardLayout>
        </UserLayout>
    );
}

export async function getServerSideProps(context) {
    try {
        const request = await clientServer.get("/user/get_profile_based_on_username", {
            params: {
                username: context.query.username
            }
        });

        if (!request.data || !request.data.profile) {
            return { notFound: true }; 
        }

        return { props: { userProfile: request.data.profile } }
    } catch (error) {
        console.error("Error fetching profile:", error);
        return { notFound: true }; 
    }
}