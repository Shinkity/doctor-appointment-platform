// Rule 5: placeholder image. Shows the doctor photo if set, otherwise initials.
export default function Avatar({ name, photo, size = 90 }) {
  const initials = name.replace("Dr. ", "").split(" ").map((n) => n[0]).join("");
  if (photo) return <img className="avatar" src={photo} alt={name} style={{ width: size, height: size }} />;
  return (
    <div className="avatar" style={{ width: size, height: size, fontSize: size / 3 }} aria-label={name}>
      {initials}
    </div>
  );
}
