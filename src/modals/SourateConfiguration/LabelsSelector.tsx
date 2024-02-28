import React from 'react';
import _ from 'lodash';
import './LabelsSelector.css'; // Assuming CSS styles are defined here

const LabelsSelector = ({ labels, selectedSourates, onSourateSelect, userState, setUserState, triggerChapterFetch }) => {
  const groupedLabels = _.groupBy(labels, 'section');

  const renderLabelsSection = (labelList) => (
    <div className="section">
      {labelList?.reverse().map((item, index) => (
        <LabelEntry 
          key={index}
          item={item}
          isSelected={selectedSourates?.includes(item.name)}
          onSelect={() => onSourateSelect(item.name, userState, setUserState, triggerChapterFetch)}
        />
      ))}
    </div>
  );
  
  return (
    <div>
      {Object.entries(groupedLabels).map(([sectionName, labelList]) => (
        <div key={sectionName}>
          {renderLabelsSection(labelList)}
        </div>
      ))}
    </div>
  );
};

const indiq = (item) => {
  return item.end === item.start ? `` : `${item.end}-${item.start}`;
}

const LabelEntry = ({ item, isSelected, onSelect }) => (
  <div 
    className={`entry ${isSelected ? 'selectedSourate' : ''}`} 
    onClick={onSelect}>
    <div className="labelContent">
      <span className="labelText">{item.name}</span>
      <span className="smallText">{indiq(item)}</span>
    </div>
  </div>
);

export default LabelsSelector;
