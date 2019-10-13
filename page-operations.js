WebViewer({
	path: '',
	useDownloader: true,
	initialDoc: 'cheetahs.pdf',
}, document.getElementById('viewer'))
	.then(function(instance) {
		var docViewer = instance.docViewer;
		var CoreControls = instance.CoreControls;
		
		
		docViewer.on('documentLoaded', function() {
			var doc = docViewer.getDocument();
			console.log(instance,doc);
			instance.disableNotesPanel();
			instance.disableTools();
						
			var moveFromDropdown = document.getElementById('move-from');
			var moveToDropdown = document.getElementById('move-to');
			var moveButton = document.getElementById('move');

		  // Updates page dropdowns when page count changes
			function updatePages(pageCount) {
				moveFromDropdown.innerHTML = '';
				moveToDropdown.innerHTML = '';

				var i;
				var option;
				for (i = 0; i < pageCount; i++) {
				  option = document.createElement('option');
				  option.innerHTML = i + 1;
				  moveFromDropdown.appendChild(option.cloneNode(true));
				  moveToDropdown.appendChild(option.cloneNode(true));
				}        
			};     

			moveButton.onclick = function() {
				var pageFrom = Number(moveFromDropdown.value);
				var pageTo = Number(moveToDropdown.value);
				if (pageFrom < pageTo) {
				  pageTo++;
				}

				// Move pages
				doc.movePages([pageFrom], pageTo);
			};

			updatePages(doc.getPageCount());
		});
	});