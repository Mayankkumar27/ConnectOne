import { getAboutUser } from '@/config/redux/action/authAction'
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect, useState } from 'react'
import styles from "./index.module.css"
import { BASE_URL, clientServer } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '@/config/redux/action/postAction'
import { current } from '@reduxjs/toolkit'

export default function ProfilePage() {

    const authState = useSelector((state) => state.auth)

    const postReducer = useSelector((state)=> state.postReducer);

    const [userProfile,setUserProfile] = useState({})

    const [userPosts, setUserPosts] = useState([])

    const[isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    const[inputData,setInputData] = useState({ company:'',position:'',years:''});

    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);

    const [educationInput, setEducationInput] = useState({ school: '', degree: '', fieldOfStudy: '' });

    const handleWorkInputChange = (e) =>{
        const {name,value} = e.target;
        setInputData({...inputData,[name]:value});
    }

    const handleEducationInputChange = (e) => {
        const { name, value } = e.target;
        setEducationInput({ ...educationInput, [name]: value });
    };

    useEffect(()=>{
        dispatch(getAboutUser({token: localStorage.getItem("token")}))
        dispatch(getAllPosts());
    },[])



    useEffect(() => {
        if (authState.user && postReducer.posts.length > 0) {
            setUserProfile(authState.user);
            
            const userSpecificPosts = postReducer.posts.filter((post) => {
                return post.userId && authState.user.userId && post.userId._id === authState.user.userId._id;
            });
            
            setUserPosts(userSpecificPosts);
        }
    }, [authState.user, postReducer.posts]);

    const updateProfilePicture = async(file)=> {
        const formData = new FormData();
        formData.append("profile_picture", file);
        formData.append("token",localStorage.getItem("token"));

        const response = await clientServer.post("/update_profile_picture", formData,{
            headers:{
                'Content-Type':'multipart/form-data',
            },
        });

        dispatch(getAboutUser({token:localStorage.getItem("token")}));
    }

    const updateProfileData = async() => {
        const request = await clientServer.post("/user_update",{
            token: localStorage.getItem("token"),
            name: userProfile.userId.name,
        });

        const response = await clientServer.post("/update_profile_data",{
            token: localStorage.getItem("token"),
            bio: userProfile.bio,
            currentPost: userProfile.currentPost,
            pastWork: userProfile.pastWork,
            education: userProfile.education
        });

        dispatch(getAboutUser({token:localStorage.getItem("token")}));
    }


  return (
    <UserLayout>
        <DashboardLayout>
            {authState.user && userProfile.userId &&
        <div className={styles.container}>
                <div className={styles.backDropContainer}>
                    <label htmlFor='profilePictureUpload' className={styles.backDrop_overlay}>
                        <p>Edit</p>
                    </label>
                    <input onChange={(e)=>{
                        updateProfilePicture(e.target.files[0])
                    }} hidden type="file" id='profilePictureUpload' />
                    <div className={styles.backDrop} ><img src={`${BASE_URL}/${userProfile.userId.profilePicture}`} alt="backdrop" /></div>
                </div>

                <div className={styles.profileContainer_details}>
                    <div style={{display:"flex",gap:"0.7rem"}}>
                        <div style={{flex: "0.8"}}>
                            <div style={{display:"flex", width:"fit-content", alignItems:"center",gap:"1.2rem"}}>
                                <input className={styles.nameEdit} type="text" value={userProfile.userId.name} onChange={(e)=> {
                                    setUserProfile({...userProfile,userId:{...userProfile.userId,name:e.target.value}})
                                }}/>
                                <p style={{ color:"grey" }}>@{userProfile.userId.name}</p>


                            </div>

                            
                                <div>
                                    <textarea
                                        value={userProfile.bio}
                                        onChange={(e)=> {
                                            setUserProfile({...userProfile,bio:e.target.value});

                                        }}
                                        rows={Math.max(3,Math.ceil(userProfile.bio.length/70))}
                                        // style={{width:'100%'}}
                                        className={`${styles.bioTextarea} user-bio`}
                                        placeholder="Write something about yourself..."
                                    
                                    />
                                </div>


                        </div>

                        <div style={{flex:"0.2rem"}}>
                            <h3>Recent Activity</h3>
                            {userPosts.map((post) => {
                                return(
                                    <div key={post._id} className={styles.postCard}>
                                        <div className={styles.card}>
                                            <div className={styles.card_profileContainer}>
                                                
                                                {post.media  ? <img src={`${BASE_URL}/${post.media}`}  alt="No media" />
                                                :
                                                 <div style={{width:"3.4rem", height:"3.4rem"}} ></div>}
                                            </div>

                                            <p>{post.body}</p>
                                        </div>
                                    </div>

                                )
                            })}

                        </div>
                        
                    </div>
                </div>


                <div className="workHistory">
                    <h4>Work History</h4>

                    <div className={styles.workHistoryContainer}>
                    {
                        userProfile.pastWork.map((work,index) => {
                            return(
                                <div key={index} className={styles.workHistoryCard}>
                                    <p style={{ fontWeight:"bold",display:"flex",alignItems:"center",gap:"0.8rem"}}>{work.company}-{work.position}</p>
                                    <p>{work.years}</p>
                                </div>
                            )
                        })
                    }

                    <button className={styles.addWorkButton} onClick={() => {
                        setIsModalOpen(true)

                    }}>Add Work</button>


                    <div className="educationHistory">
                        <h4>Education</h4>
                        <div className={styles.workHistoryContainer}>
                        {userProfile.education &&
                            userProfile.education.map((edu,index) => {
                                return(
                                    <div key={index} className={styles.workHistoryCard}>
                                        <p style={{ fontWeight:"bold" }}>{edu.school}</p>
                                        <p>{edu.degree}, {edu.fieldOfStudy}</p>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>


                    <button className={styles.addEducationButton} onClick={() => {
                        setIsEducationModalOpen(true);

                    }}>Add Education</button>
                    
                    
                    </div>
                </div>
                {userProfile != authState.user &&
                    <div className={styles.buttonContainer}>
                        <div  onClick={() => {
                            updateProfileData();
                        }} className={styles.updateProfileBtn}>
                            Update Profile
                        </div>
                    </div>
                }


                  
              </div>
            }


            {
                isModalOpen &&
                <div 
                    onClick={() => {
                        setIsModalOpen(false);
                    }}

                    className={styles.commentsContainer}>
                    <div onClick={(e) => {
                        e.stopPropagation()
                    }}
                    className={styles.allCommentsContainer}>
                    <input onChange={handleWorkInputChange} name='company' className={styles.inputField} type="text" placeholder="Enter Company" />
                    <input onChange={handleWorkInputChange} name='position' className={styles.inputField} type="text" placeholder="Enter Position" />
                    <input onChange={handleWorkInputChange} name='years' className={styles.inputField} type="number" placeholder="Enter Years" />

                    <div onClick={() => {
                        setUserProfile({...userProfile,pastWork:[...userProfile.pastWork,inputData]})
                        setIsModalOpen(false)
                    }} className={styles.updateProfileBtn}>Add Work</div>
                    </div>    
                </div>
            }

            {
                isEducationModalOpen &&
                <div 
                    onClick={() => {
                        setIsEducationModalOpen(false);
                    }}
                    className={styles.commentsContainer}>
                    <div onClick={(e) => {
                        e.stopPropagation()
                    }}
                    className={styles.allCommentsContainer}>
                        <h3>Add Education</h3>
                        <input onChange={handleEducationInputChange} name='school' className={styles.inputField} type="text" placeholder="Enter School/University" />
                        <input onChange={handleEducationInputChange} name='degree' className={styles.inputField} type="text" placeholder="Enter Degree (e.g., B.Tech)" />
                        <input onChange={handleEducationInputChange} name='fieldOfStudy' className={styles.inputField} type="text" placeholder="Enter Field & Years (e.g., 2015-2019)" />

                        <div onClick={() => {
                            setUserProfile({...userProfile, education:[...userProfile.education, educationInput]})
                            setIsEducationModalOpen(false)
                        }} className={styles.updateProfileBtn}>Add Education</div>
                    </div>    
                </div>
            }

        </DashboardLayout>
    </UserLayout>
  )
}
