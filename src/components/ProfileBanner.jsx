export default function ProfileBanner({ userEmail, onLogout }) {
  return (
    <div className="profile-banner">
      <div>
        <strong>Signed in as</strong>
        <p>{userEmail}</p>
      </div>
      <button className="logout-button" onClick={onLogout}>
        Sign out
      </button>
    </div>
  );
}
