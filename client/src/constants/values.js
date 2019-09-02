export const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    zIndex: 1001,
    bottom: 'unset',
    left: 'unset',
    right: 'unset',
    top: 'unset',
    transform: 'unset',
    padding: 10,
    maxWidth: '90%',
    maxHeight: '90%'
  }
};

export const modalStyleBig = {
  overlay: {
    ...modalStyle.overlay
  },
  content: {
    ...modalStyle.content,
    maxHeight: '95%'
  }
};