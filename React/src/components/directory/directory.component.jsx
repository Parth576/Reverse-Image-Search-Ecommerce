import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import { selectSearchString } from './../../redux/search/search.selectors';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

const Directory = ({ sections, searchString }) => {
  const filteredCategories = sections.filter(section=>
    section.title.toLowerCase().includes(searchString.toLowerCase()))
  return(
  <div className='directory-menu'>
    {filteredCategories.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
  searchString: selectSearchString,
});

export default connect(mapStateToProps)(Directory);
