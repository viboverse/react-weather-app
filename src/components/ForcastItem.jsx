export default function ForcastItem({
  date,
  iconUrl,
  altImage,
  minTemp,
  maxTemp,
}) {
  return (
    <li className="text-center">
      <p>{date}</p>
      <img src={iconUrl} alt={altImage} />
      <p>
        {Math.round(minTemp)}° / {Math.round(maxTemp)}°
      </p>
    </li>
  );
}
