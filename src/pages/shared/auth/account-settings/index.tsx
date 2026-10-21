import ChangeEmail from "../../../../components/account-settings/change-email";
import ChangeDetails from "../../../../components/account-settings/change-details";
import ChangePassword from "../../../../components/account-settings/change-password";
import { useState } from "react";
import { SettingsSection } from "../../../../enums/settings-enums";
import {
    Main,
    TabsContainer,
    MainContainer,
    TabButton
} from "./styles";

function AccountSettings() {
    const [currentSection, setCurrentSection] = useState(SettingsSection.ChangeDetails);

    const renderSection = () => {
        switch (currentSection) {
            case SettingsSection.ChangeEmail:
                return <ChangeEmail />;
            case SettingsSection.ChangeDetails:
                return <ChangeDetails />;
            case SettingsSection.ChangePassword:
                return <ChangePassword />;
            default:
                return null;
        }
    }

    return (
        <Main>
            <MainContainer>
                <TabsContainer>
                    <TabButton
                        size="small"
                        active={SettingsSection.ChangeDetails === currentSection}
                        onClick={() => setCurrentSection(SettingsSection.ChangeDetails)}
                    >
                        Change details
                    </TabButton>
                    <TabButton
                        size="small"
                        active={SettingsSection.ChangeEmail === currentSection}
                        onClick={() => setCurrentSection(SettingsSection.ChangeEmail)}
                    >
                        Change email
                    </TabButton>
                    <TabButton
                        size="small"
                        active={SettingsSection.ChangePassword === currentSection}
                        onClick={() => setCurrentSection(SettingsSection.ChangePassword)}
                    >
                        Change password
                    </TabButton>
                </TabsContainer>
                {renderSection()}
            </MainContainer>
        </Main>
    );
}

export default AccountSettings;