import React from 'react';
import PropTypes from 'prop-types';
import EditModal from '../editModal/EditModal';

const AddFolderModal = ({ isAddFolderModalOpen, setIsAddFolderModalOpen }) => {
  return (
    <EditModal
      visible={isAddFolderModalOpen}
      onClose={() => setIsAddFolderModalOpen(false)}
    />
  );
};

AddFolderModal.propTypes = {
  isAddFolderModalOpen: PropTypes.bool.isRequired,
  setIsAddFolderModalOpen: PropTypes.func.isRequired,
};

export default AddFolderModal;
