export default function ForcastItem({ date, iconUrl, altImage, temp }) {
  return (
    <li className="text-center">
      <p>{date}</p>
      <img src={iconUrl} alt={altImage} />
      <p>{Math.round(temp)}°</p>
    </li>
  );
}
