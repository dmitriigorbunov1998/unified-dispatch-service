import { Header } from './Header';
import { useHeaderControls } from './model/useHeaderControls';
import { useHeaderSearch } from './model/useHeaderSearch';

export function HeaderContainer() {
  const controls = useHeaderControls();
  const search = useHeaderSearch(controls.tabs, controls.onTabChange);

  return <Header {...controls} {...search} />;
}
