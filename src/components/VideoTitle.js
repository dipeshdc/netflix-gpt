const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[13%] px-14 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="py-6 text-l w-1/4">{overview}</p>
        <div className="flex space-between">
            <button className="bg-white text-black p-3 px-10 text-lg rounded lg hover:opacity-80">▶️Play</button>
            <button className=" mx-2 bg-gray-500 text-white p-3 px-10 text-lg rounded lg hover:opacity-80">More Info</button>
        </div>
    </div>
  )
}


export default VideoTitle