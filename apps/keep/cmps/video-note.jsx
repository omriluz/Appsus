import { utilService } from "../../../services/util.service.js";
export function VideoNote({ note }) {


  const { url } = note.info
  const formattedUrl = utilService.formatForEmbed(url)
  return <div className="video-container">
    <iframe className="video-player" src={formattedUrl} frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;
    gyroscope; picture-in-picture"
      allowFullScreen ></iframe>
  </div>
}






