import Portal from "./Portal";
import { useMount } from "./useMount";
import { Layout } from "./Layout";

export const ComplexAnimatedModal = ({ opened, onClose, children }) => {
  const { mounted } = useMount({ opened });

  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <Layout onClose={onClose} opened={opened}>
        {children}
      </Layout>
    </Portal>
  );
};

{/* <ComplexAnimatedModal opened={opened} onClose={() => setOpened(false)}>
            <PortfolioModal opened={opened} items={items}/>
          </ComplexAnimatedModal> */}