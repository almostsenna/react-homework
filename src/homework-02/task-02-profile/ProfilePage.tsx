import PageTitle from '../../components/PageTitle';
import ProfileHeader from './components/ProfileHeader';
import ContactInfo from './components/ContactInfo';
import ExperienceList from './components/ExperienceList';
import SkillsList from './components/SkillsList';
import { profile, experience, skills } from './data/profileData';

export default function ProfilePage() {
  return (
    <div className="profile-page task-page">
      <PageTitle eyebrow="Персональна сторінка" title={profile.fullName} description="Навчання, досвід і те, що мене цікавить." />
      <ProfileHeader profile={profile} />
      <div className="profile-columns">
        <ContactInfo phone={profile.phone} email={profile.email} city={profile.city} github={profile.github} />
        <ExperienceList experience={experience} />
      </div>
      <SkillsList skills={skills} />
    </div>
  );
}
