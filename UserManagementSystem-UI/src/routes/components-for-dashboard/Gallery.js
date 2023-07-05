import React, { useContext, useEffect } from 'react'
// import { usercontext } from "src/App";

function Gallery() {
    // const { dispatch } = useContext(usercontext)

// const toggleDark=()=>{
// }
useEffect(()=>{
    // dispatch({ type: "USER", payload: 1 })

},[])
    return (
        <div className='gallery'>
            <div className='head-gallery'>All Photos</div>
            {/* <span className='togglemod'><a role="Button" className="sidebaranchor" aria-pressed="true" onClick={toggleDark}>Darkmod</a></span> */}

                <div className="grid-container">
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/1.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image 1" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/2.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image2" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/3.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image3" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/4.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image4" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/5.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image5" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/6.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image6" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/7.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image7" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/8.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image8" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/9.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image9" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/10.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image10" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/11.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image11" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/12.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image12" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/13.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image13" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/14.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image14" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/15.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image15" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/16.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image16" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/17.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image17" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/18.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image18" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/19.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image19" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/20.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image20" />
                    </div>   
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/21.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image21" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/22.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image22" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/23.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image23" />
                    </div>
                    <div>
                        <img src={`https://avatars.dicebear.com/v2/avataaars/24.svg?options[mood][
                ]=happy`} width="100%" height="70%" alt="my image24" />
                    </div>
                </div>

        </div>
    )
}
export default Gallery;