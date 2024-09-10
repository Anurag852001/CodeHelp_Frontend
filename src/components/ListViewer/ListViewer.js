function ListViewer(items) {
  return (
    <div>
      <ol>
        {items.map((item, index) => (
          <li>item</li>
        ))}
      </ol>
    </div>
  );
}

export default ListViewer;
