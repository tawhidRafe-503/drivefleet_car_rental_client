"use client";

const ConfirmDeleteModal = ({ open, title, onCancel, onConfirm, loading }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-base-100 p-6 shadow-xl">
                <h3 className="font-display text-lg font-semibold">Delete this listing?</h3>
                <p className="mt-2 text-sm text-base-content/70">
                    {title ? `"${title}" ` : "This car "}
                    will be permanently removed. This can&apos;t be undone.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <button className="btn btn-ghost" onClick={onCancel} disabled={loading}>
                        Cancel
                    </button>
                    <button className="btn btn-error text-white" onClick={onConfirm} disabled={loading}>
                        {loading ? <span className="loading loading-spinner loading-sm" /> : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;