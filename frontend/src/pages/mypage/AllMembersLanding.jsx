// // src/pages/mypage/AllMembersLanding.jsx
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

// const Wrapper = styled.div`
//   background-color: #000;
//   color: #fff;
// `;

// const VideoHero = styled.div`
//   width: 100%;
//   max-height: 520px;
//   overflow: hidden;

//   video {
//     width: 100%;
//     height: auto;
//     display: block;
//   }
// `;

// const Content = styled.section`
//   max-width: 960px;
//   margin: 0 auto;
//   padding: 40px 16px 80px;
//   text-align: center;
// `;

// const Title = styled.h1`
//   font-size: 40px;
//   margin-bottom: 24px;
// `;

// const Text = styled.p`
//   font-size: 16px;
//   line-height: 1.8;
//   margin-bottom: 8px;
// `;

// const JoinButton = styled.button`
//   margin-top: 32px;
//   padding: 12px 48px;
//   border: none;
//   background-color: #ffc800;
//   color: #111;
//   font-size: 16px;
//   cursor: pointer;
// `;

// export const AllMembersLanding = () => {
//   const navigate = useNavigate();

//   const handleJoinClick = () => {
//     navigate("/account/register");
//   };

//   return (
//     <Wrapper>
//       <VideoHero>
//         <video
//           src="/video/allmembers.mp4" // 실제 동영상 경로로 교체
//           autoPlay
//           muted
//           loop
//           playsInline
//         />
//       </VideoHero>

//       <Content>
//         <Title>올멤버스 All-Members</Title>
//         <Text>탄소 발자국 0(Net Zero)을 향한</Text>
//         <Text>올버즈의 여정에 함께해주셔서 감사합니다.</Text>
//         <Text>지금 올멤버스에 가입하고 특별한 혜택을 누려보세요!</Text>

//         <JoinButton onClick={handleJoinClick}>회원가입</JoinButton>
//       </Content>
//     </Wrapper>
//   );
// };
