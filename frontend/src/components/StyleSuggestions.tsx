import React from "react";
import { DESIGN_STYLES } from "../utils/constants";

interface StyleSuggestionsProps {
  onStyleSelect: (prompt: string) => void;
}

export const StyleSuggestions: React.FC<StyleSuggestionsProps> = ({
  onStyleSelect,
}) => {
  return (
    <div className="card p-6 mb-8">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
        <span className="text-2xl mr-2">🎯</span>
        پیشنهادهای سبک
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DESIGN_STYLES.map((style) => (
          <div
            key={style.id}
            className="border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => onStyleSelect(style.prompt)}
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">{style.emoji}</span>
              <h4 className="font-semibold text-gray-800 group-hover:text-primary-600">
                {style.name}
              </h4>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {style.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
