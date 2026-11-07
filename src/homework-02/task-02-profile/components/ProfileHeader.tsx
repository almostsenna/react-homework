import type { Profile } from '../types';

interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <section className="profile-header surface-card" aria-label="Про мене">
      <figure className="profile-photo">
        <img src={profile.photo} alt={profile.photoAlt} width="240" height="280" />
        <figcaption>Особисте фото</figcaption>
      </figure>
      <div>
        <p className="profile-nickname">@{profile.nickname}</p>
        <h2>{profile.role}</h2>
        <p className="profile-city">{profile.city}</p>
        <p className="profile-about">{profile.about}</p>
      </div>
    </section>
  );
}
