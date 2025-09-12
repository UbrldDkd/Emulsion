# Advanced Search Dropdown Workflow Test

## 🎯 **Requirements Implemented**

1. ✅ **State Management**: AdvancedSearchDropdown holds all selected values for each filter type
2. ✅ **Single Filter Type**: User can search by ONLY one type at a time:
   - Year/Interval
   - Era/Movement  
   - Artist
   - Artform/Genre/Medium
3. ✅ **Clear Previous Selections**: When switching between filterBy types, previous selections are cleared
4. ✅ **Always Navigate to /discover**: Apply search always goes to discover page with query params
5. ✅ **CSV loads on website load**: Data loads immediately when app starts

## 🧪 **Test Workflow**

### Test 1: Year Filter
1. Open website (`http://localhost:3001`)
2. Click filter dropdown icon in navbar
3. Select "Year" (default)
4. Set year range (e.g., 1800-1900)
5. Click "Apply Search"
6. **Expected**: Navigate to `/discover?yearMin=1800&yearMax=1900`
7. **Expected**: See filtered artworks from 1800-1900

### Test 2: Switch to Era Filter (Should Clear Year)
1. Open filter dropdown again
2. Click "Year" → Select "Era"
3. **Expected**: Year selections cleared, now showing Era options
4. Select an era (e.g., Renaissance)
5. Select some movements within that era
6. Click "Apply Search"
7. **Expected**: Navigate to `/discover?eras=Renaissance&movements=...`

### Test 3: Switch to Artist Filter (Should Clear Era)
1. Open filter dropdown again  
2. Click "Era" → Select "Artists"
3. **Expected**: Era/movement selections cleared, now showing artist search
4. Search for "Monet"
5. Select "Claude Monet"
6. Click "Apply Search"
7. **Expected**: Navigate to `/discover?artists=Claude Monet`

### Test 4: Switch to Artform Filter (Should Clear Artist)
1. Open filter dropdown again
2. Click "Artists" → Select "Artform" 
3. **Expected**: Artist selections cleared, now showing artforms
4. Select an artform (e.g., hover over Paintings → click "Genres")
5. Select some genres
6. Click "Apply Search"
7. **Expected**: Navigate to `/discover?artforms=...&genres=...`

### Test 5: Data Loading Verification
1. Open browser dev tools (F12)
2. Go to Console tab
3. Refresh page
4. **Expected**: See loading messages:
   ```
   🚀 Starting to load MET Museum data...
   ✅ MET Museum data loaded successfully in XXXXms
   ```

### Test 6: Query Parameters Working
1. Manually navigate to: `/discover?yearMin=1850&yearMax=1900`
2. **Expected**: See artworks filtered to 1850-1900 range
3. Try: `/discover?artists=Claude Monet`
4. **Expected**: See only Monet artworks

## 🔍 **Verification Points**

- [ ] CSV loads automatically on app start (check console)
- [ ] Switching filter types clears previous selections
- [ ] Apply search always goes to `/discover` with correct query params
- [ ] Discover page reads query params and filters data
- [ ] Only one filter type can be active at a time
- [ ] URL is bookmarkable and sharable

## 🚀 **Current Status**

The system is now fully implemented and ready for testing at:
**http://localhost:3001**

All components work together:
1. **DataLoader** → Loads CSV on app start
2. **AdvancedSearchDropdown** → Manages filter state and navigation
3. **Discover page** → Reads query params and shows filtered results
4. **Real MET Museum data** → From MetObjects.txt file