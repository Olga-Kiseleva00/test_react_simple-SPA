import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { data } from '../data';
import type { NodeType } from '../data';
import { authTextFieldStyle, buttonStyle } from '../styles';


export default function BrowsePage(): JSX.Element {
  const [selectedParent, setSelectedParent] = useState<NodeType | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [sortedChildren, setSortedChildren] = useState<NodeType[]>([]);

  const handleParentClick = (parent: NodeType): void => {
    setSelectedParent(parent);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchText = event.target.value.toLowerCase();
    setSearchInput(searchText);
    const filteredChildren = selectedParent?.children.filter((child) =>
      child.name.toLowerCase().includes(searchText)
    ) || [];
    setSortedChildren(filteredChildren);
  };

  const renderChildren = (parentNode: NodeType | null): JSX.Element | null => {
    if (!parentNode || !parentNode.children || parentNode.children.length === 0) {
      return null;
    }

    return (
      <ul>
        {parentNode.children.map((child) => (
          <li key={child.key}>
            {`${child.key}. ${child.name}`}
            {renderChildren(child)}
          </li>
        ))}
      </ul>
    );
  };

  const sortChildrenByName = (): void => {
    if (selectedParent) {
      const sorted = [...selectedParent.children].sort((a, b) => a.name.localeCompare(b.name));
      setSortedChildren(sorted);
    }
  };

  return (
    <div style={{ display: 'flex'}}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '22px'}}> 
        {data[0]?.children.map((el: NodeType) => (
          <p key={el.key} onClick={() => handleParentClick(el)}>
            <span style={{ color: '#008080', fontWeight: 'bold' }}>{el.key}</span>. {el.name}
          </p>
          ))}
        </div>
      </div>
      <div style={{ flex: 1,  }}>
        {selectedParent && selectedParent.children.length > 0 && (
          <>
          <Container style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              type="text"
              placeholder="Поиск по имени"
              value={searchInput}
              onChange={handleSearchChange}
              sx={{ ...authTextFieldStyle, marginRight: '8px', flex: 1 }} 
            />
            <Button
              onClick={sortChildrenByName}
              type='button'
              sx={buttonStyle}
              variant="outlined"
              style={{ height: '56px' }} 
            >
              Сортировка по имени
            </Button>
          </Container>
          <div style={{ fontSize: '20px'}}> 
            {sortedChildren.length > 0
              ? sortedChildren.map((child) => (
                  <li key={child.key}>{`${child.key}. ${child.name}`}</li>
                ))
              : renderChildren(selectedParent)
            }
            </div>
          </>
        )}
      </div>
    </div>
  );
}

