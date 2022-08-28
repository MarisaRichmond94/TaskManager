import { createContext } from 'react';

interface ISectionHotKeysContext {
};

const SectionHotKeysContext = createContext<undefined | ISectionHotKeysContext>(undefined);

export default SectionHotKeysContext;
