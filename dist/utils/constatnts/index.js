"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowSearchableFields = exports.cowFilterableFields = exports.paginationProps = exports.CCowCategory = exports.CLabel = exports.CLocation = exports.CUserRole = void 0;
exports.CUserRole = ['seller', 'buyer'];
exports.CLocation = ['Dhaka', 'Chattogram', 'Barishal', 'Rajshahi', 'Sylhet', 'Comilla', 'Rangpur', 'Mymensingh'];
exports.CLabel = ['for sale', 'sold out'];
exports.CCowCategory = ['Dairy', 'Beef', 'DualPurpose'];
// pagination props
exports.paginationProps = ['page', 'limit', 'sortBy', 'sortOrder'];
// filterable fields for cows
exports.cowFilterableFields = ['searchTerm', 'minPrice', 'maxPrice', 'location', 'age', 'label', 'category'];
exports.cowSearchableFields = ['location', 'breed', 'category'];
