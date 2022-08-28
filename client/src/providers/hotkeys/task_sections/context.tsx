import { createContext } from 'react';

interface ISectionsHotkeysContext {
};

const SectionsHotkeysContext = createContext<undefined | ISectionsHotkeysContext>(undefined);

export default SectionsHotkeysContext;
