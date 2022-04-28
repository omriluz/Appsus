import { utilService } from "../../../services/util.service.js";
export function VideoNote({ note }) {
  
  const { url } = note.info
  const formattedUrl = utilService.formatForEmbed(url)

  return <iframe width="150" height="170" src={formattedUrl} frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media;
      gyroscope; picture-in-picture"
    allowFullScreen ></iframe>
}




