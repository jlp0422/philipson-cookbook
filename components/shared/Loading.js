// const Loader = styled.div`
//   display: inline-block;
//   position: relative;
//   width: 80px;
//   height: 80px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   margin: 2rem auto;
//   div {
//     box-sizing: border-box;
//     display: block;
//     position: absolute;
//     width: 64px;
//     height: 64px;
//     margin: 8px;
//     border: 8px solid #00bfff;
//     border-radius: 50%;
//     animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
//     border-color: #00bfff transparent transparent transparent;
//   }
//   div:nth-of-type(1) {
//     animation-delay: -0.45s;
//   }
//   div:nth-of-type(2) {
//     animation-delay: -0.3s;
//   }
//   div:nth-of-type(3) {
//     animation-delay: -0.15s;
//   }
//   @keyframes spinner {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }
// `

const divClass =
  'box-border block absolute w-16 h-16 m-2 border-8 border-solid border-blue-300 rounded-full animate-loader'

const Loading = () => {
  return (
    <div className='relative inline-block w-20 h-20 mx-auto my-2'>
      <div className={divClass} style={{ animationDelay: '-0.45s' }}></div>
      <div className={divClass} style={{ animationDelay: '-0.3s' }}></div>
      <div className={divClass} style={{ animationDelay: '-0.15s' }}></div>
      <div className={divClass}></div>
    </div>
  )
}

export default Loading
